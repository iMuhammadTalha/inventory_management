import * as http from "http";
import express, { Request, Response } from "express";

export const LoggerMock = {
  log: jest.fn((value: string) => {
    return;
  }),
  error: jest.fn((value: string) => {
    return;
  }),
  setContext: jest.fn((value: string) => {
    return;
  }),
  debug: jest.fn(() => {
    return;
  }),
};
