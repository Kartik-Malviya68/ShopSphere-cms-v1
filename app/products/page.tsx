"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useStamina from "@/modules/StateManagement/Stamina/useStamina";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EditDataSlider from "./_components/EditDataSlider/EditDataSlider";
import ViewData from "./_components/ViewData/ViewData";

function page() {
  const [showRowData, action] = useStamina({
    initialState: {
      showRowData: false,
    },
    actions: {
      toggleShowRowData(v) {
        v.showRowData = !v.showRowData;
      },
    },
  });
  const [products, setProducts] = useState<ProductForm.Product[]>([]);
  const [pId, setPId] = useState<string[]>([]);
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
  const deleteProduct = async () => {
    try {
      await Promise.all(
        pId.map((productID) =>
          axios.delete(
            `https://shopesphere-backend-v1.vercel.app/api/v1/products/del/${productID}`
          )
        )
      );
      toast("Product deleted", { type: "success" });
      window.location.reload();
    } catch (error) {
      toast("Product not deleted", { type: "error" });
    }
  };
  const toggleProductSelection = (productID: string) => {
    setPId((perv) => {
      if (perv.includes(productID)) {
        return perv.filter((p) => p !== productID);
      } else {
        return [...perv, productID];
      }
    });
  };
  const triptText = (text: any) => {
    return text.length > 40 ? text.substring(0, 40) + "..." : text;
  };

  const router = useRouter();
  console.log(pId);
  return (
    <div className="container w-full">
      <ToastContainer />

      <div className="w-full flex p-5  justify-between ">
        <Button variant={"link"} onClick={() => router.push("/")}>
          Go To Add Data
        </Button>
        <div className="self-end flex gap-3">
          <Button
            variant="destructive"
            onClick={deleteProduct}
            disabled={pId.length === 0}
          >
            Delete
          </Button>

          <EditDataSlider productId={pId[0]} />
        </div>
      </div>
      <Table>
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

            <TableHead className="w-[20px]">Select</TableHead>
            <TableHead>View Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, index) => (
            <TableRow key={index} onClick={action.toggleShowRowData}>
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
              <TableCell>
                <Checkbox
                  name="product"
                  value={product._id}
                  onCheckedChange={() => toggleProductSelection(product._id)}
                  onChange={() => toggleProductSelection(product._id)}
                />
              </TableCell>
              <TableCell>
                <ViewData product={product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default page;
