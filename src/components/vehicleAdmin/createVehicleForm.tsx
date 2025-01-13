import React from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

const CREATE_VEHICLE = gql`
  mutation CreateVehicle($type: VehicleType!, $propulsion: PropulsionType!) {
    createVehicle(type: $type, propulsion: $propulsion) {
      id
      name
      price
      stock
      status
      specifications
      images {
        id
        url
        caption
      }
      options {
        id
        name
        price
      }
    }
  }
`;

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
  const [createVehicle, { loading }] = useMutation(CREATE_VEHICLE);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: 'CAR',
      propulsion: 'ESSENCE',
      price: '',
      stock: '',
      specifications: '',
      status: 'AVAILABLE'
    }
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await createVehicle({
        variables: {
          type: values.type,
          propulsion: values.propulsion
        }
      });
      form.reset();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Erreur lors de la création du véhicule:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Ajouter un nouveau véhicule</DialogTitle>
        </DialogHeader>

        <Form form={form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <FormItem name=''>
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
                        <FormItem name=''>
                          <FormLabel>Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner le type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="CAR">Voiture</SelectItem>
                              <SelectItem value="SCOOTER">Scooter</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="propulsion"
                      render={({ field }) => (
                        <FormItem name=''>
                          <FormLabel>Propulsion</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Type de propulsion" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ELECTRIC">Électrique</SelectItem>
                              <SelectItem value="ESSENCE">Essence</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Prix et Stock */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Prix et Stock</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem name=''>
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
                      <FormItem name=''>
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
                </CardContent>
              </Card>

              {/* Statut */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Statut</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem name=''>
                        
                        <FormLabel>État du véhicule</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner le statut" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="AVAILABLE">Disponible</SelectItem>
                            <SelectItem value="LOW_STOCK">Stock faible</SelectItem>
                            <SelectItem value="OUT_OF_STOCK">Rupture de stock</SelectItem>
                            <SelectItem value="CLEARANCE">Liquidation</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                      <FormItem name=''>
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
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVehicleForm;