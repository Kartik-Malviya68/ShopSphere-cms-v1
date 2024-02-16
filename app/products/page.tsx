"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function page() {
  const [products, setProducts] = useState<ProductForm.Product[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://shopesphere-backend-v1.vercel.app/api/v1/products/getAllProducts"
      )
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setProducts]);

  console.log(products);

  const triptText = (text: any) => {
    return text.length > 40 ? text.substring(0, 40) + "..." : text;
  };

  return (
    <div className="overflow-x-scroll">
      <Table className="overflow-x-scroll">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Style</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Rating Count</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{index}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.genderType}</TableCell>
              <TableCell>{product.style}</TableCell>
              <TableCell>{product.color}</TableCell>
              <TableCell>{product.rating?.rating}</TableCell>
              <TableCell>{product.rating?.ratingCount}</TableCell>
              <TableCell>{triptText(product.description)}</TableCell>
              <TableCell>
                <div className="w-full flex gap-1 flex-wrap">
                  {product.image.map((img, index) => (
                    <Image
                      src={img}
                      key={index}
                      width={50}
                      height={50}
                      alt="img"
                    />
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default page;
