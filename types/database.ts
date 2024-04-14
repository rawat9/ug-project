export type Json =
  | Buffer
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      dashboard: {
        Row: {
          content: Json | null
          created_at: string
          id: string
          title: string
          user_id: string | null
          is_published: boolean
          description: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string
          id?: string
          title?: string
          user_id?: string | null
          is_published?: boolean
          description?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string
          id?: string
          title?: string
          user_id?: string | null
          is_published?: boolean
          description?: string | null
        }
        Relationships: []
      }
      integration: {
        Row: {
          created_at: string
          id: string
          title: string
          description: string
          user_id: string | null
          conn_string: { type: 'Buffer'; data: number[] } | null
          is_default: boolean
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string
          user_id?: string | null
          description?: string
          conn_string?: { type: 'Buffer'; data: number[] } | null
          is_default?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          user_id?: string | null
          description?: string
          conn_string?: { type: 'Buffer'; data: number[] } | null
          is_default?: boolean
        }
        Relationships: []
      }
      query: {
        Row: {
          created_at: string
          id: string
          integration_id: string | null
          name: string
          sql_query: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          integration_id?: string | null
          name?: string | null
          sql_query?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          integration_id?: string | null
          name?: string | null
          sql_query?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'public_query_integration_id_fkey'
            columns: ['integration_id']
            isOneToOne: false
            referencedRelation: 'integration'
            referencedColumns: ['id']
          },
        ]
      }
      tables: {
        Row: {
          created_at: string
          id: string
          is_public: boolean | null
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_public?: boolean | null
          name?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_public?: boolean | null
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      auth_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      convert_to_uuid: {
        Args: {
          input_value: string
        }
        Returns: string
      }
      get_default_content: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          search_term: string
        }
        Returns: {
          content: Json | null
          created_at: string
          id: string
          title: string
          user_id: string | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never
