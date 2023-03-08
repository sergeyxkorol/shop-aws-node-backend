import * as Joi from "joi";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

type ProductInput = {
  title: string;
  description: string;
  price: number;
  count: number;
};

const ProductSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  count: Joi.number().required(),
});

export const validateProduct = (product: ProductInput) =>
  ProductSchema.validate(product);
