"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ReactNode } from "react";


interface IProps {
    children: ReactNode
}

export function Providers({ children }: IProps) {
  return <Provider store={store}>{children}</Provider>;
}