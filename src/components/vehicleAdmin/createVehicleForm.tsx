import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ImageIcon } from 'lucide-react';
import { ADD_VEHICLE } from '../../api/vehicleApi';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import {
  Select,
  SelectItem,
} from '../ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Plus, X, MoveUp, MoveDown, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';


const formSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  type: z.enum(['CAR', 'SCOOTER']),
  propulsion: z.enum(['ELECTRIC', 'ESSENCE']),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Le prix doit être un nombre positif'
  }),
  stock: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
    message: 'Le stock doit être un nombre positif'
  }),
  specifications: z.string().min(10, 'Les spécifications doivent contenir au moins 10 caractères'),
  status: z.enum(['AVAILABLE', 'LOW_STOCK', 'OUT_OF_STOCK', 'CLEARANCE']),
  images: z.array(z.object({
    url: z.string().min(1, 'L\'image est requise'),  // URL ne peut pas être vide
    caption: z.string().min(1, 'La légende est requise'), // Caption est maintenant requis
    order: z.number()
  })).min(1, 'Au moins une image est requise'),  // Au moins une image est requise

  options: z.array(
    z.object({
      name: z.string().min(1, 'Le nom est requis'),
      description: z.string().optional(),
      price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
        message: 'Le prix doit être un nombre positif',
      }),
      clientTempId: z.string().min(1, 'Un ID temporaire est requis'), // ⭐ Nouveau champ
      incompatibleOptions: z.array(z.string()).optional().default([]), // ⭐ Nouveau champ
    })
  ),
});


type FormValues = z.infer<typeof formSchema>;

interface CreateVehicleFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CreateVehicleForm: React.FC<CreateVehicleFormProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [AddVehicle, { loading }] = useMutation(ADD_VEHICLE);
  const [previews, setPreviews] = useState<{ [key: number]: string }>({});

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: 'CAR',
      propulsion: 'ESSENCE',
      price: '',
      stock: '',
      specifications: '',
      status: 'AVAILABLE',
      images: [],
      options: []
    }
  });

  const onSubmit = async (values: FormValues) => {
    console.log(values.options)
    try {
      const response = await AddVehicle({
        variables: {
          type: values.type,
          propulsion: values.propulsion,
          name: values.name,
          price: parseFloat(values.price),
          stock: parseInt(values.stock),
          specifications: values.specifications,
          images: values.images.map((img) => ({
            url: img.url,
            caption: img.caption || '',
            order: img.order,
          })),
          options: values.options.map((opt) => ({
            name: opt.name,
            description: opt.description || '',
            price: parseFloat(opt.price),
            clientTempId: opt.clientTempId, // ⭐ Inclure l'ID temporaire
            incompatibleOptions: opt.incompatibleOptions || [], // ⭐ Inclure les incompatibilités
          })),
        },
      });

      if (response.data) {
        console.log('Véhicule créé avec succès:', response.data);
        form.reset();
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      console.error('Erreur lors de la création du véhicule:', error);
    }
  };

  const saveImageLocally = async (file: File): Promise<string> => {
    try {
      // Créer un nom de fichier unique
      const timestamp = new Date().getTime();
      const randomString = Math.random().toString(36).substring(2, 15);
      const extension = file.name.split('.').pop();
      const filename = `${timestamp}-${randomString}.${extension}`;

      // Créer un FormData pour envoyer le fichier
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', filename);

      // Envoyer le fichier à votre endpoint backend
      const response = await fetch('http://localhost:8079/SERVICE-VEHICLE/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de l'upload de l'image: ${await response.text()}`);
      }

      const result = await response.json();

      return result.url || `/img/vehicles/${filename}`;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'image:', error);
      throw error;
    }
  };


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Créer une URL de prévisualisation temporaire
      const previewUrl = URL.createObjectURL(file);
      setPreviews(prev => ({ ...prev, [index]: previewUrl }));

      // Sauvegarder l'image localement et obtenir l'URL
      const localUrl = await saveImageLocally(file);

      // Mettre à jour le champ URL dans le formulaire
      const currentImages = form.getValues('images');
      currentImages[index].url = localUrl;
      form.setValue('images', currentImages);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      // Nettoyer la prévisualisation en cas d'erreur
      setPreviews(prev => {
        const newPreviews = { ...prev };
        delete newPreviews[index];
        return newPreviews;
      });
    }
  };

  const imagesFields = form.watch('images');
  const optionsFields = form.watch('options');

  const addImage = () => {
    const currentImages = form.getValues('images');
    form.setValue('images', [
      ...currentImages,
      { url: '', caption: '', order: currentImages.length }
    ]);
  };

  const removeImage = (index: number) => {
    // Nettoyer la prévisualisation
    setPreviews(prev => {
      const newPreviews = { ...prev };
      delete newPreviews[index];
      return newPreviews;
    });

    const currentImages = form.getValues('images');
    const newImages = currentImages
      .filter((_, idx) => idx !== index)
      .map((img, idx) => ({ ...img, order: idx }));
    form.setValue('images', newImages);
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const currentImages = [...form.getValues('images')];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < currentImages.length) {
      const temp = currentImages[index];
      currentImages[index] = currentImages[newIndex];
      currentImages[newIndex] = temp;

      // Update order values
      currentImages.forEach((img, idx) => {
        img.order = idx;
      });

      form.setValue('images', currentImages);
    }
  };

  const addOption = () => {
    const currentOptions = form.getValues('options');
    form.setValue('options', [
      ...currentOptions,
      {
        name: '',
        description: '',
        price: '',
        clientTempId: crypto.randomUUID(), // ⭐ Générer un ID temporaire
        incompatibleOptions: [], // ⭐ Initialiser les incompatibilités
      },
    ]);
  };

  const removeOption = (index: number) => {
    const currentOptions = form.getValues('options');
    form.setValue('options', currentOptions.filter((_, idx) => idx !== index));
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto"
        aria-describedby="dialog-description"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Ajouter un nouveau véhicule</DialogTitle>
        </DialogHeader>
        <p id="dialog-description" className="sr-only">
          Formulaire pour ajouter un nouveau véhicule.
        </p>

        <Form form={form} onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Informations de base */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem name="name">
                      <FormLabel>Nom du véhicule</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: Toyota Corolla 2024" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem name="type">
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value} multiple={false}>
                            <SelectItem value="CAR">Voiture</SelectItem>
                            <SelectItem value="SCOOTER">Scooter</SelectItem>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="propulsion"
                    render={({ field }) => (
                      <FormItem name="propulsion">
                        <FormLabel>Propulsion</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value} multiple={false}>
                            <SelectItem value="ELECTRIC">Électrique</SelectItem>
                            <SelectItem value="ESSENCE">Essence</SelectItem>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Prix et Stock */}
            <Card className='col-span-2'>
              <CardHeader>
                <CardTitle className="text-lg">Prix et Stock</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem name='price'>
                        <FormLabel>Prix (XAF)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="ex: 1500000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem name='stock'>
                        <FormLabel>Stock disponible</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="ex: 5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>


            {/* Spécifications */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Spécifications</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="specifications"
                  render={({ field }) => (
                    <FormItem name='specifications'>
                      <FormLabel>Caractéristiques techniques</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez les spécifications du véhicule..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>


            {/* Section Images */}
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Images</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={addImage}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une image
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {imagesFields.length === 0 && (
                  <div className="text-red-500 text-sm">Au moins une image est requise</div>
                )}
                {imagesFields.map((field, index) => (
                  <div key={index} className="flex items-start space-x-4 border p-4 rounded-lg">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center space-x-4">
                        {/* Zone de prévisualisation ou upload */}
                        <div className="relative w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden">
                          <FormField
                            control={form.control}
                            name={`images.${index}.url`}
                            render={({ field: urlField }) => (
                              <FormItem name={`images.${index}.url`} className="w-full h-full">
                                {previews[index] ? (
                                  <img
                                    src={previews[index]}
                                    alt="Prévisualisation"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="text-center">
                                    <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                                    <span className="text-sm text-gray-500">Aucune image</span>
                                  </div>
                                )}
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  onChange={(e) => handleFileChange(e, index)}
                                />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Légende */}
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name={`images.${index}.caption`}
                            render={({ field }) => (
                              <FormItem name={`images.${index}.caption`}>
                                <FormLabel>Légende<span className="text-red-500 ml-1">*</span></FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Description de l'image..." />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Boutons de contrôle */}
                    <div className="flex flex-col space-y-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => moveImage(index, 'up')}
                        disabled={index === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => moveImage(index, 'down')}
                        disabled={index === imagesFields.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Section Options */}
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Options</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={addOption}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une option
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {optionsFields.map((_, index) => (
                  <div key={index} className="flex items-start space-x-4 border p-4 rounded-lg">
                    <div className="flex-1 space-y-4">
                      <FormField
                        control={form.control}
                        name={`options.${index}.name`}
                        render={({ field }) => (
                          <FormItem name={`options.${index}.name`}>
                            <FormLabel>Nom de l'option</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="ex: Climatisation" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`options.${index}.description`}
                        render={({ field }) => (
                          <FormItem name={`options.${index}.description`}>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="Description de l'option..." />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`options.${index}.price`}
                        render={({ field }) => (
                          <FormItem name={`options.${index}.price`}>
                            <FormLabel>Prix (XAF)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" placeholder="ex: 150000" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`options.${index}.incompatibleOptions`}
                        render={({ field }) => (
                          <FormItem name={`options.${index}.incompatibleOptions`}>
                            <FormLabel>Options incompatibles (optionnel)</FormLabel>
                            <FormControl>
                              <Select
                                multiple
                                value={field.value || []}
                                onValueChange={(values) => field.onChange(values)}
                              >
                                {optionsFields
                                  .filter((opt) => opt.clientTempId !== optionsFields[index].clientTempId)
                                  .map((opt) => (
                                    <SelectItem
                                      key={opt.clientTempId}
                                      value={opt.clientTempId}
                                    >
                                      {opt.name || 'Option sans nom'}
                                    </SelectItem>
                                  ))}
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création en cours...
                </>
              ) : (
                'Créer le véhicule'
              )}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVehicleForm;