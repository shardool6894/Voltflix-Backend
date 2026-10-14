const mongoose = require("mongoose");

const chargingStationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
        validate: {
          validator: (value) => value.length === 2,
          message: "Coordinates must be [longitude, latitude].",
        },
      },
    },

    connectors: {
      type: [
        {
          type: String,
          enum: [
            "CCS",
            "CHAdeMO",
            "Type 2",
            "GB/T",
            "Tesla",
            "NACS",
          ],
        },
      ],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "available",
        "in-use",
        "offline",
        "maintenance",
        "fault",
      ],
      required: true,
      default: "available",
    },

    network: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

chargingStationSchema.index({location : "2dsphere"})

const chargingStationModel = mongoose.model("ChargingStation", chargingStationSchema);
module.exports = {chargingStationModel}