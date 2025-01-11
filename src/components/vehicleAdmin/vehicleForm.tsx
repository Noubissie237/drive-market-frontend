import React from 'react';
import { useForm } from 'react-hook-form';
import { Vehicle } from '../../types/vehicle';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    Input,
    Button,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from '../ui';

interface VehicleFormProps {
    initialData?: Vehicle;
    onSubmit: (data: Partial<Vehicle>) => void;
    isLoading?: boolean;
}

export const VehicleForm: React.FC<VehicleFormProps> = ({
    initialData,
    onSubmit,
    isLoading
}) => {
    const form = useForm<Partial<Vehicle>>({
        defaultValues: initialData || {}
    });

    return (
        <Form form={form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        name="brand"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Marque</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="model"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Modèle</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="engineType"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Type de moteur</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner un type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="ELECTRIC">Électrique</SelectItem>
                                        <SelectItem value="GASOLINE">Essence</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="price"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Prix</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                {/* Ajoutez d'autres champs selon vos besoins */}

                <div className="flex justify-end space-x-4">
                    <Button variant="outline" type="button">
                        Annuler
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};