import { Request, Response } from "express";
import { PrismaClient, Status } from "../generated/prisma/index.js";
import { randomNameGenerator } from "../lib/ai.js";

const prisma = new PrismaClient();

export const getGadgetsHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const gadgets = await prisma.gadget.findMany({
      where: {
        userId,
      },
    });

    if (!gadgets || gadgets.length === 0) {
      return res.status(404).json({ message: "No gadgets found" });
    }

    return res.status(200).json(gadgets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getGadgetsByStatusHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { status } = req.query;
    const userId = req.userId;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    if (!(status.toString().toUpperCase() in Object.values(Status))) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const UStatus = status.toString().toUpperCase() as Status;

    const gadgets = await prisma.gadget.findMany({
      where: {
        userId,
        status: UStatus,
      },
    });

    console.log(gadgets);

    if (!gadgets || gadgets.length === 0) {
      return res
        .status(404)
        .json({ message: "No gadgets found for this status" });
    }

    return res.status(200).json(gadgets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createGadgetHandler = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const name = await randomNameGenerator();

    if (!name) {
      return res
        .status(400)
        .json({ message: "Failed to generate gadget name" });
    }

    if (!Object.values(Status).includes(status.toUpperCase() as Status)) {
      return res
        .status(400)
        .json({ message: "Invalid status value! Insert a valid status." });
    }
    const Ustatus = status.toUpperCase() as Status;

    const newGadget = await prisma.gadget.create({
      data: {
        name,
        status: Ustatus || Status.AVAILABLE,
        userId,
      },
    });

    return res.status(201).json(newGadget);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateGadgetHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    const userId = req.userId;

    if (!name && !status) {
      return res.status(400).json({ message: "Name or status is required" });
    }

    const updatedGadget = await prisma.gadget.update({
      where: {
        id,
        userId,
      },
      data: {
        name,
        status,
      },
    });

    return res.status(200).json(updatedGadget);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteGadgetHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const deletedGadget = await prisma.gadget.update({
      where: {
        id,
        userId,
      },
      data: {
        status: Status.DECOMMISSIONED,
      },
    });

    return res
      .status(200)
      .json({ message: "Gadget deleted successfully", deletedGadget });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const selfDestructGadgetHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { secret } = req.body;

    if (secret !== process.env.SELF_DESTRUCT_SECRET) {
      return res.status(403).json({
        message:
          "Forbidden! You are not authorised to self destruct this gadget.",
      });
    }

    const selfDestructedGadget = await prisma.gadget.update({
      where: {
        id,
        userId,
      },
      data: {
        status: Status.DESTROYED,
      },
    });

    return res.status(200).json({
      message: "Gadget self-destructed successfully",
      selfDestructedGadget,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
