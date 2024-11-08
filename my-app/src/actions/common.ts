"use server"

import { revalidateTag } from "next/cache"

export async function clearcache(tag : string) {
    revalidateTag(tag) ; 
}