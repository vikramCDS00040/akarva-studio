"use client";

import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

interface GalleryImage {
  id: number;
  base64: string;
  order: number;
  published: boolean;
  title: string;
}

export default function GalleryAdmin() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/gallery-images.json")
      .then(res => res.json())
      .then((data: GalleryImage[]) => {
        setImages(data.sort((a, b) => a.order - b.order));
      })
      .catch(() => {
        const defaultImages: GalleryImage[] = Array.from({length: 6}, (_, i) => ({
          id: i + 1,
          base64: "",
          order: i + 1,
          published: true,
          title: ""
        }));
        setImages(defaultImages);
      });
  }, []);

  const handleDragStart = (id: number) => setDraggedItem(id);
  
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  
  const handleDrop = (targetId: number) => {
    if (draggedItem === null) return;
    
    const newImages = [...images];
    const draggedIndex = newImages.findIndex(img => img.id === draggedItem);
    const targetIndex = newImages.findIndex(img => img.id === targetId);
    
    [newImages[draggedIndex], newImages[targetIndex]] = [newImages[targetIndex], newImages[draggedIndex]];
    
    // Update order values
    newImages.forEach((img, index) => {
      img.order = index + 1;
    });
    
    setImages(newImages);
    setDraggedItem(null);
    toast.success("Order updated");
  };

  const handleFileSelection = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImages(prev => prev.map(img => 
        img.id === id ? { ...img, base64 } : img
      ));
      setEditingId(id);
      setDialogOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleDialogSave = () => {
    if (editingId === null) return;
    setImages(prev => prev.map(img => 
      img.id === editingId ? { ...img, title: newTitle || `Image ${editingId}` } : img
    ));
    setDialogOpen(false);
    setEditingId(null);
    setNewTitle("");
  };

  const handleRemove = (id: number) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, base64: "", title: "" } : img
    ));
    toast.success("Image removed");
  };

  const handleTogglePublish = (id: number) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, published: !img.published } : img
    ));
  };

  const handleSaveAll = async () => {
    try {
      const res = await fetch("/api/save-gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(images)
      });
      
      if (res.ok) {
        toast.success("Gallery saved successfully!");
      } else {
        toast.error("Failed to save gallery");
      }
    } catch (_err) {
      toast.error("Error saving gallery");
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
          Gallery Management
        </h1>
        <div className="gap-5 flex">
          <Button className="bg-primary hover:border-primary/50 transition-all cursor-pointer text-black px-8">
            <Link href="/">Home</Link>
          </Button>
          <Button
            onClick={handleSaveAll}
            className="bg-primary hover:border-primary/50 transition-all cursor-pointer text-black px-8"
          >
            Save All Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-10">
        {images.map((image, _index) => (
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
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                {image.base64 ? (
                  <>
                    <Image
                      src={image.base64}
                      alt={image.title || `Gallery ${image.id}`}
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
                  {image.title || `Slot ${image.order}`}
                </span>
                {image.base64 && (
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
