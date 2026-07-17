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

    requestCount: {
      type: Number,
      default: 0,
    },

    lastUsedAt: {
      type: Date,
      default: null,
    },

    rateLimit: {
      type: Number,
      default: 100,
    },
    
    windowStart: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const ApiKey = model("ApiKey", apiKeySchema);