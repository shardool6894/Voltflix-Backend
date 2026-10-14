const {z} = require('zod')
const chargingStationValidation = z.object({
  name: z.string().trim().min(1, "Name is required"),
  address: z.string().trim().min(1, "Address is required"),
  location: z.object({
    type: z.literal("Point").default("Point"),
    coordinates: z
      .tuple([
        z.number({ required_error: "Longitude is required" }),
        z.number({ required_error: "Latitude is required" })
      ]) // z.tuple perfectly validates exactly two numbers [longitude, latitude]
  }),
  connectors: z
    .array(
      z.enum(["CCS", "CHAdeMO", "Type 2", "GB/T", "Tesla", "NACS"])
    )
    .min(1, "At least one connector is required"),
  status: z
    .enum(["available", "in-use", "offline", "maintenance", "fault"])
    .default("available"),
  network: z.string().trim().min(1, "Network is required"),
});
module.exports = {chargingStationValidation}