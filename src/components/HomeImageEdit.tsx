"use client";

import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

interface ImageSlot {
  published: boolean;
  id: number;
  url: string | null;
  title?: string;
  order?: number;
}

export default function HeroImagesEdit() {
  const [images, setImages] = useState<ImageSlot[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Record<number, File>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load JSON from public folder
  useEffect(() => {
    fetch("/hero-images.json")
      .then((res) => res.json())
      .then((data: ImageSlot[]) => {
        setImages(data);
        setIsLoaded(true);
      })
      .catch(() => {
        setImages([]); // fallback empty
        setIsLoaded(true);
      });
  }, []);

  const handleDragStart = (id: number) => setDraggedItem(id);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (targetId: number) => {
    if (draggedItem === null) return;
    const newImages = [...images];
    const draggedIndex = newImages.findIndex((img) => img.id === draggedItem);
    const targetIndex = newImages.findIndex((img) => img.id === targetId);

    [newImages[draggedIndex], newImages[targetIndex]] = [
      newImages[targetIndex],
      newImages[draggedIndex],
    ];

    setImages(newImages);
    setDraggedItem(null);
    toast.success("Image order updated");
  };

  const handleFileSelection = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Save file in memory
    setSelectedFiles((prev) => ({ ...prev, [id]: file }));

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages((prev) =>
        prev.map((img) =>
          img.id === id ? { ...img, url: reader.result as string } : img
        )
      );
    };
    reader.readAsDataURL(file);

    // Open dialog for title
    setEditingId(id);
    setDialogOpen(true);
  };

  const handleDialogSave = () => {
    if (editingId === null) return;
    const updatedImages = images.map((img) =>
      img.id === editingId
        ? { ...img, title: newTitle || `Slot ${editingId}` }
        : img
    );
    setImages(updatedImages);
    setDialogOpen(false);
    setEditingId(null);
    setNewTitle("");
  };

  const handleRemove = (id: number) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, url: null, title: undefined } : img
      )
    );
    setSelectedFiles((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    toast.success("Image removed");
  };

  const handleSaveAll = async () => {
    const orderedImages = images.map((img, index) => ({
      ...img,
      order: index + 1,
    }));

    const formData = new FormData();

    // Append selected files
    Object.entries(selectedFiles).forEach(([id, file]) => {
      formData.append("images", file);
      formData.append("ids", id);
    });

    // Append metadata JSON with placeholders for URLs
    const jsonMetadata = orderedImages.map((img) => {
      // If new file uploaded, update url to path: /uploads/hero-{id}.{ext}
      const file = selectedFiles[img.id];
      if (file) {
        const ext = file.name.split(".").pop() || "jpg";
        return { ...img, url: `/prod/hero-${img.id}.${ext}` };
      }
      return img;
    });

    formData.append("metadata", JSON.stringify(jsonMetadata));

    try {
      const res = await fetch("/api/save-hero-images", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        toast.success("All changes saved successfully!");
        setSelectedFiles({});
        setImages(jsonMetadata);
      } else toast.error("Failed to save changes");
    } catch (err) {
      console.error(err);
      toast.error("Error saving changes");
    }
  };

  const handleTogglePublish = (id: number) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, published: !img.published } : img
      )
    );
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
          Hero Images
        </h1>
        <div className="gap-5 flex">
          <Button className="bg-primary hover:border-primary/50 transition-all cursor-pointer text-black px-8">
            <Link href={"/"}>Home</Link>
          </Button>

          <Button
            onClick={handleSaveAll}
            className="bg-primary hover:border-primary/50 transition-all cursor-pointer text-black px-8"
          >
            Save All Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 p-10">
        {images.map((image, index) => (
          <Card
            key={image.id}
            draggable
            onDragStart={() => handleDragStart(image.id)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(image.id)}
            className={`border-border bg-card hover:border-primary/50 transition-all cursor-move ${
              image.published ? "" : "opacity-60 grayscale"
            }`}
          >
            <CardContent className="p-4">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                {image.url ? (
                  <>
                    <Image
                      src={image.url}
                      alt={image.title || `Hero ${image.id}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => handleRemove(image.id)}
                      className="absolute top-2 right-2 rounded-full bg-destructive p-2 text-destructive-foreground hover:bg-destructive/90"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary">
                    <Upload size={32} />
                    <span className="text-sm">Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileSelection(image.id, e)}
                    />
                  </label>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-medium">
                  {image.title || `Slot  ${index + 1}`}
                </span>

                {image.url && (
                  <Button
                    size="sm"
                    onClick={() => handleTogglePublish(image.id)}
                  >
                    {image.published ? "Published" : "Unpublished"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Image Title</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Title for this image"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="mb-4"
          />
          <DialogFooter>
            <Button onClick={handleDialogSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
