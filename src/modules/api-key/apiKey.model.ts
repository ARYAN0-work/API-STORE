import { Schema, model } from "mongoose";

const apiKeySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    api: {
      type: String,
      required: true,
      trim: true,
    },

    keyHash: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastUsedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const ApiKey = model("ApiKey", apiKeySchema);