"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function page() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductForm.Product>({});
  const onSubmitProductData: SubmitHandler<ProductForm.Product> = (data) => {
    axios
      .post(
        `https://shopesphere-backend-v1.vercel.app/api/v1/products/create`,
        data
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
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
  console.log(image);
  return (
    <div className="w-full flex justify-center py-40 items-center ">
      <div className="absolute top-3 left-3 grid grid-cols-2 grid-rows-3 gap-4">
        {image.map((image, index) => (
          <Image
            key={image}
            src={image}
            className="cursor-pointer"
            alt="preivew"
            width={150}
            height={150}
            onClick={() => removeImage(index)}
          />
        ))}
      </div>
      <form
        onSubmit={handleSubmit(onSubmitProductData)}
        className="w-[800px] flex items-center flex-col justify-start gap-10"
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
              <span className="text-red-600">{errors.category.message}</span>
            )}
          </div>
          <div className="w-full gap-2 flex flex-col">
            <label className="text-gray-300" htmlFor="">
              Enter Gender
            </label>
            <Select
              {...register("genderType", { required: "This is required" })}
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
              <span className="text-red-600">{errors.genderType.message}</span>
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
            {color.map((color, index) => (
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
            <Input type="text" id="colorInput" placeholder="Product price" />
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
            <Input type="text" id="imageInput" placeholder="Product Image" />
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
            <span className="text-red-600">{errors.description.message}</span>
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
              {...register("rating.rating", { required: "This is required" })}
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
          Add Product
        </Button>
      </form>
    </div>
  );
}

export default page;
