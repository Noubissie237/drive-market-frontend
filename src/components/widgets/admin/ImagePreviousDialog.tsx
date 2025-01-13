import React from "react";
import { VehicleImage } from "../../../types/vehicle";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Button, DialogHeader } from "../../ui";
import { ImageIcon } from "lucide-react";


export const ImagePreviewDialog: React.FC<{ images: VehicleImage[] }> = ({ images }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" size="sm" className="hover:bg-gray-50">
        <ImageIcon className="h-4 w-4 mr-2 text-gray-600" />
        {images.length} photos
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>Galerie photos</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {images.map((image) => (
          <div key={image.id} className="group relative overflow-hidden rounded-lg">
            <img
              src={image.url}
              alt={image.caption}
              className="h-48 w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="absolute bottom-2 left-2 right-2 text-sm text-white">
                {image.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </DialogContent>
  </Dialog>
);
