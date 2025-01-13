import React from "react";
import { VehicleOption } from "../../../types/vehicle";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Button, Card, CardContent, DialogHeader } from "../../ui";
import { PackageIcon } from "lucide-react";

export const OptionsDialog: React.FC<{ options: VehicleOption[] }> = ({ options }) => (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="hover:bg-gray-50">
                <PackageIcon className="h-4 w-4 mr-2 text-gray-600" />
                {options.length} options
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Options et équipements</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
                {options.map((option) => (
                    <Card key={option.id} className="overflow-hidden transition-all hover:shadow-md">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold text-gray-900">{option.name}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                                </div>
                                <span className="text-lg font-semibold text-gray-900">
                                    {option.price.toLocaleString('fr-FR')} XAF
                                </span>
                            </div>
                            {option.incompatibleOptions.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                    <p className="text-sm text-rose-600 flex items-center">
                                        <span className="mr-1">⚠️</span>
                                        Non compatible avec : {option.incompatibleOptions.map(o => o.name).join(', ')}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </DialogContent>
    </Dialog>
);