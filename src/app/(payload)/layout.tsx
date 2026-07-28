import config from '@payload-config'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'
import type { ReactNode } from 'react'
import '@payloadcms/next/css'
import { importMap } from './admin/importMap'

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default function PayloadLayout({ children }: { children: ReactNode }) {
  return RootLayout({
    children,
    config,
    importMap,
    serverFunction,
  })
}
