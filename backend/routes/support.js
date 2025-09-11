import express from "express";
import { createObjectCsvWriter } from "csv-writer";
import path from "path";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, query } = req.body;

    if (!name?.trim() || !email?.trim() || !phone?.trim() || !query?.trim()) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // --- 1️⃣ Save to database if you have a model ---
    /*
    const supportDoc = new Support({ name, email, phone, query });
    await supportDoc.save();
    */

    // --- 2️⃣ Save to CSV ---
    const csvWriter = createObjectCsvWriter({
      path: path.join(process.cwd(), "support-data.csv"), // CSV file in project root
      header: [
        { id: "name", title: "Name" },
        { id: "email", title: "Email" },
        { id: "phone", title: "Phone" },
        { id: "query", title: "Query" },
        { id: "createdAt", title: "Created At" },
      ],
      append: true, // Important: append new records
    });

    await csvWriter.writeRecords([
      { name, email, phone, query, createdAt: new Date().toISOString() },
    ]);

    res.status(200).json({ message: "Support request submitted successfully" });
  } catch (err) {
    console.error("Error saving support request:", err);
    res.status(500).json({ error: "Failed to submit request" });
  }
});

export default router;
