import { supabaseClient } from "@/lib/supabase/client"
import { v4 as uuidv4 } from "uuid"

export class BaseService<T extends { id: string }> {
  private tableName: string
  private sampleData: T[]

  constructor(tableName: string, sampleData: T[] = []) {
    this.tableName = tableName
    this.sampleData = sampleData
  }

  async getAll(foreignKey?: { key: string; value: string }): Promise<T[]> {
    try {
      let query = supabaseClient.from(this.tableName).select("*")

      if (foreignKey) {
        query = query.eq(foreignKey.key, foreignKey.value)
      }

      const { data, error } = await query.order("created_at", { ascending: false })

      if (error) {
        console.error(`Error fetching data from ${this.tableName}:`, error)
        return this.sampleData
      }

      return (data as T[]) || this.sampleData
    } catch (err) {
      console.error(`Exception in ${this.tableName}.getAll:`, err)
      return this.sampleData
    }
  }

  async getById(id: string): Promise<T | null> {
    try {
      const { data, error } = await supabaseClient.from(this.tableName).select("*").eq("id", id).single()

      if (error) {
        console.error(`Error fetching ${this.tableName} by id:`, error)
        return this.sampleData.find((item) => item.id === id) || null
      }

      return data as T
    } catch (err) {
      console.error(`Exception in ${this.tableName}.getById:`, err)
      return this.sampleData.find((item) => item.id === id) || null
    }
  }

  async create(item: Omit<T, "id" | "created_at" | "updated_at">): Promise<T> {
    const now = new Date().toISOString()
    const id = uuidv4()

    const newItem = {
      id,
      ...item,
      created_at: now,
      updated_at: now,
    }

    try {
      const { data, error } = await supabaseClient.from(this.tableName).insert(newItem).select().single()

      if (error) {
        console.error(`Error creating ${this.tableName}:`, error)
        throw error
      }

      return data as T
    } catch (err) {
      console.error(`Exception in ${this.tableName}.create:`, err)
      return newItem as T
    }
  }

  async update(id: string, item: Partial<Omit<T, "id" | "created_at" | "updated_at">>): Promise<T> {
    const now = new Date().toISOString()

    const updatedItem = {
      ...item,
      updated_at: now,
    }

    try {
      const { data, error } = await supabaseClient
        .from(this.tableName)
        .update(updatedItem)
        .eq("id", id)
        .select()
        .single()

      if (error) {
        console.error(`Error updating ${this.tableName}:`, error)
        throw error
      }

      return data as T
    } catch (err) {
      console.error(`Exception in ${this.tableName}.update:`, err)

      // Return a mock updated item for UI purposes
      const existingItem = this.sampleData.find((item) => item.id === id)
      return {
        ...(existingItem || ({ id } as any)),
        ...item,
        updated_at: now,
      } as T
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabaseClient.from(this.tableName).delete().eq("id", id)

      if (error) {
        console.error(`Error deleting from ${this.tableName}:`, error)
        throw error
      }

      return true
    } catch (err) {
      console.error(`Exception in ${this.tableName}.delete:`, err)
      throw err
    }
  }
}
