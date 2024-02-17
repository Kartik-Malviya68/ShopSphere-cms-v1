"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React from "react";

function ViewData({ product }: { product: ProductForm.Product }) {
  return React.Children.only (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Data</Button>``
      </DialogTrigger>
      <DialogContent className="h-[800px] max-w-[800px]">
        <ScrollArea className=" flex w-full flex-col gap-1 rounded-md">
          <h3 className=" my-4 scroll-m-20 text-2xl font-semibold">
            {`Product ID:: ${product._id}`}
          </h3>
          <Separator />
          <h3 className=" my-4 scroll-m-20 text-2xl font-semibold">
            {`Name: ${product.name}`}
          </h3>
          <Separator />
          <h3 className=" my-4 scroll-m-20 text-2xl font-semibold">
            {`Brand: ${product.brand}`}
          </h3>
          <Separator />
          <h3 className=" my-4 scroll-m-20 text-2xl font-semibold">
            {`Price: ${product.price}`}
          </h3>
          <Separator />
          <h3 className=" my-4 scroll-m-20 text-2xl font-semibold">
            {`Category: ${product.category}`}
          </h3>
          <Separator />
          <h3 className=" my-4 scroll-m-20 text-2xl font-semibold">
            {`Gender: ${product.genderType}`}
          </h3>
          <Separator />
          <div className="flex flex-col gap-1">
            <h3 className=" my-4 scroll-m-20 text-2xl font-semibold">
              Description
            </h3>
            <Textarea readOnly value={product.description} />
          </div>
          <Separator />
          <h3 className=" my-4 scroll-m-20 text-2xl font-semibold">
            {`Style: ${product.style}`}
          </h3>
          <Separator />
          <h3 className=" my-4 scroll-m-20 text-2xl font-semibold">
            {`Color: ${product.color.map((color) => color)}`}
          </h3>
          <Separator />
          <div className="flex items-center gap-3">
            <h3 className=" my-4 scroll-m-20 text-2xl font-semibold">
              {`rating: ${product.rating.rating}`}
            </h3>
            <h3 className=" my-4 scroll-m-20 text-2xl font-semibold">
              {`ratingCount: ${product.rating.ratingCount}`}
            </h3>
          </div>
          <Separator />
          <div className="grid grid-cols-3 grid-rows-3 gap-4">
            {product.image.map((img, index) => (
              <Image
                src={img}
                key={index}
                alt="product image"
                width={300}
                height={300}
              />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default ViewData;
