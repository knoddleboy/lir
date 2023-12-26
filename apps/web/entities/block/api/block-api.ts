import type { CreateBlockDto, UpdateBlockDto } from "@lir/lib/dto";
import type {
  BlockProps,
  CreateBlockInput,
  UpdateBlockInput,
} from "@lir/lib/schema";

import type { AxiosResponse } from "axios";

import { apiClient } from "~/shared";

export const blockKeys = {
  block: {
    root: ["block"],
  },

  mutation: {
    createBlock: () => [...blockKeys.block.root, "createBlock"],
    updateBlock: (id: string) => [...blockKeys.block.root, "updateBlock", id],
  },
};

export const createBlock = async (data: CreateBlockInput) => {
  const response = await apiClient.post<
    BlockProps,
    AxiosResponse<BlockProps>,
    CreateBlockDto
  >("/block", data);

  return response.data;
};

export const updateBlock = async (data: UpdateBlockInput) => {
  const response = await apiClient.patch<
    BlockProps,
    AxiosResponse<BlockProps>,
    UpdateBlockDto
  >("/block", data);

  return response.data;
};
