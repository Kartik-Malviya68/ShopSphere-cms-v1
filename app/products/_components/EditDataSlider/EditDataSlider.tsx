"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pencil2Icon } from "@radix-ui/react-icons";
function EditDataSlider({ productId }: { productId: string }) {
  const [products, setProducts] = useState<ProductForm.Product>();

  const getProduct = async () => {
    if (productId === undefined) {
      return;
    }
    await axios
      .get(
        `https://shopesphere-backend-v1.vercel.app/api/v1/products/${productId}`
      )
      .then((res) => {
        setProducts(res.data);
      });
  };
  useEffect(() => {
    getProduct();
  }, [productId]);
  console.log(products);
  useState<ProductForm.Product | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setValue,
    watch,
    formState,
    reset,
  } = useForm<ProductForm.Product>({
    defaultValues: async () => {
      const products = await axios.get(
        `https://shopesphere-backend-v1.vercel.app/api/v1/products/${productId}`
      );
      return products.data;
    },
  });
  const onSubmitProductEditData: SubmitHandler<ProductForm.Product> = (
    data
  ) => {
    axios
      .put(
        `https://shopesphere-backend-v1.vercel.app/api/v1/products/update/${productId}`,
        
        data
      )

      .then(() => {})
      .catch((err) => {
        console.log(err);
        toast(`Product Update Failed ${err}`, { type: "error" });
      });
  };
  const color = watch("color", []);
  const image = watch("image", []);
  const addColor = () => {
    const colorInput = document.getElementById(
      "colorInput"
    ) as HTMLInputElement;
    const colorValue = colorInput.value.trim();
    if (colorValue !== "") {
      setValue("color", [...color, colorValue] as any);
      colorInput.value = "";
    }
  };

  const removeColor = (index: number) => {
    const newColor = [...color];
    newColor.splice(index, 1);
    setValue("color", newColor);
  };

  const addImage = () => {
    const ImageInput = document.getElementById(
      "imageInput"
    ) as HTMLInputElement;
    const imageValue = ImageInput.value.trim();
    if (imageValue !== "") {
      setValue("image", [...image, imageValue] as any);
      ImageInput.value = "";
    }
  };

  const removeImage = (index: number) => {
    const newImage = [...image];
    newImage.splice(index, 1);
    setValue("image", newImage);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      toast("Product Updated", { type: "success" });
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <Sheet>
      <SheetTrigger>
        <Pencil2Icon className="h-4 w-4" />
      </SheetTrigger>
      <SheetContent className="sm:min-w-[900px]">
        <ScrollArea className="h-screen">
          <div className="w-[800px] mx-auto gap-10 flex-col flex justify-center py-10 items-center ">
            <ToastContainer />

            <form
              onSubmit={handleSubmit(onSubmitProductEditData)}
              className="w-full flex items-center flex-col justify-start gap-10"
            >
              <div className="flex items-center w-full gap-3 justify-between">
                <div className="w-full gap-2 flex flex-col">
                  <label className="text-gray-300" htmlFor="">
                    Enter Name
                  </label>
                  <Input
                    type="text"
                    {...register("name", {
                      required: "This is required",
                    })}
                    placeholder="brand Name"
                  />
                  {errors.name && (
                    <span className="text-red-600">{errors.name.message}</span>
                  )}
                </div>
                <div className=" w-full gap-2 flex flex-col">
                  <label className="text-gray-300" htmlFor="">
                    Enter brand
                  </label>
                  <Input
                    type="text"
                    {...register("brand", {
                      required: "This is required",
                    })}
                    placeholder="Product brand"
                  />
                  {errors.brand && (
                    <span className="text-red-600">{errors.brand.message}</span>
                  )}
                </div>
                <div className="w-full gap-2 flex flex-col">
                  <label className="text-gray-300" htmlFor="">
                    Enter price
                  </label>
                  <Input
                    type="text"
                    {...register("price", {
                      required: "This is required",
                    })}
                    placeholder="Product price"
                  />
                  {errors.price && (
                    <span className="text-red-600">{errors.price.message}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center w-full gap-3 justify-between">
                <div className="w-full gap-2 flex flex-col">
                  <label className="text-gray-300" htmlFor="">
                    Enter Category
                  </label>
                  <Input
                    type="text"
                    {...register("category", {
                      required: "This is required",
                    })}
                    placeholder="brand category"
                  />
                  {errors.category && (
                    <span className="text-red-600">
                      {errors.category.message}
                    </span>
                  )}
                </div>
                <div className="w-full gap-2 flex flex-col">
                  <label className="text-gray-300" htmlFor="">
                    Enter Gender
                  </label>
                  <Select
                    {...register("genderType", {
                      required: "This is required",
                    })}
                    onValueChange={(v) => setValue("genderType", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="unisex">unisex</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.genderType && (
                    <span className="text-red-600">
                      {errors.genderType.message}
                    </span>
                  )}
                </div>
                <div className="w-full gap-2 flex flex-col">
                  <label className="text-gray-300" htmlFor="">
                    Enter Style
                  </label>
                  <Input
                    type="text"
                    {...register("style", { required: "This is required" })}
                    placeholder="Product style"
                  />
                  {errors.style && (
                    <span className="text-red-600">{errors.style.message}</span>
                  )}
                </div>
              </div>
              <div className="  w-full gap-2 flex flex-col">
                <div className="flex gap-2 items-center">
                  {products?.color.map((color, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span
                        onClick={() => removeColor(index)}
                        className="w-4 h-4 cursor-pointer rounded-full"
                        style={{ backgroundColor: `${color}` }}
                      ></span>
                    </div>
                  ))}
                </div>
                <label className="text-gray-300" htmlFor="">
                  Enter Color
                </label>
                <div className="w-full gap-2 flex items-center">
                  <Input
                    type="text"
                    id="colorInput"
                    placeholder="Product Gender"
                  />
                  <Button size="lg" onClick={addColor} type="button">
                    Add Color
                  </Button>
                  {errors.color && (
                    <span className="text-red-600">{errors.color.message}</span>
                  )}
                </div>
              </div>
              <div className="  w-full gap-2 flex flex-col">
                <label className="text-gray-300" htmlFor="">
                  Add Image
                </label>
                <div className="w-full gap-2 flex items-center">
                  <Input
                    type="text"
                    id="imageInput"
                    placeholder="Product Image"
                  />
                  <Button size="lg" onClick={addImage} type="button">
                    Add Image
                  </Button>
                  {errors.image && (
                    <span className="text-red-600">{errors.image.message}</span>
                  )}
                </div>
              </div>

              <div className=" w-full gap-2 flex flex-col">
                <label className="text-gray-300" htmlFor="">
                  Enter Description
                </label>
                <Textarea
                  placeholder="Type your description."
                  {...register("description", { required: "This is required" })}
                />
                {errors.description && (
                  <span className="text-red-600">
                    {errors.description.message}
                  </span>
                )}
              </div>
              <div className="flex items-center w-full gap-3 justify-between">
                <div className="w-full gap-2 flex flex-col">
                  <label className="text-gray-300" htmlFor="">
                    Enter Rating
                  </label>
                  <Input
                    type="text"
                    placeholder="Rating"
                    {...register("rating.rating", {
                      required: "This is required",
                    })}
                  />
                  {errors.rating?.rating && (
                    <span className="text-red-600">
                      {errors.rating?.rating.message}
                    </span>
                  )}
                </div>
                <div className="w-full gap-2 flex flex-col">
                  <label className="text-gray-300" htmlFor="">
                    Enter Count
                  </label>
                  <Input
                    type="text"
                    placeholder="Rating Count"
                    {...register("rating.ratingCount", {
                      required: "This is required",
                    })}
                  />
                  {errors.rating?.rating && (
                    <span className="text-red-600">
                      {errors.rating?.rating.message}
                    </span>
                  )}
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full">
                Update Product
              </Button>
            </form>
            <div className="w-full grid grid-cols-3 grid-rows-3 gap-4">
              {products?.image.map((image, index) => (
                <Image
                  key={image}
                  src={image}
                  className="cursor-pointer"
                  alt="preivew"
                  width={300}
                  height={300}
                  onClick={() => removeImage(index)}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export default EditDataSlider;
