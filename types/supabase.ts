export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      cashiers: {
        Row: {
          fullName: string;
          id: number;
          image: string | null;
        };
        Insert: {
          fullName: string;
          id?: number;
          image?: string | null;
        };
        Update: {
          fullName?: string;
          id?: number;
          image?: string | null;
        };
        Relationships: [];
      };
      discounts: {
        Row: {
          code: string;
          cut: number | null;
          percentage: number | null;
        };
        Insert: {
          code: string;
          cut?: number | null;
          percentage?: number | null;
        };
        Update: {
          code?: string;
          cut?: number | null;
          percentage?: number | null;
        };
        Relationships: [];
      };
      menu: {
        Row: {
          description: string | null;
          id: number;
          image: string | null;
          name: string;
          options: Json[] | null;
          price: number | null;
        };
        Insert: {
          description?: string | null;
          id?: number;
          image?: string | null;
          name: string;
          options?: Json[] | null;
          price?: number | null;
        };
        Update: {
          description?: string | null;
          id?: number;
          image?: string | null;
          name?: string;
          options?: Json[] | null;
          price?: number | null;
        };
        Relationships: [];
      };
      purchases: {
        Row: {
          cashier: string | null;
          discounts: string[] | null;
          id: number;
          item: string | null;
          options: string[] | null;
          profit: number | null;
          timestamp: string;
        };
        Insert: {
          cashier?: string | null;
          discounts?: string[] | null;
          id?: number;
          item?: string | null;
          options?: string[] | null;
          profit?: number | null;
          timestamp?: string;
        };
        Update: {
          cashier?: string | null;
          discounts?: string[] | null;
          id?: number;
          item?: string | null;
          options?: string[] | null;
          profit?: number | null;
          timestamp?: string;
        };
        Relationships: [];
      };
      quotes: {
        Row: {
          id: number;
          text: string;
        };
        Insert: {
          id?: number;
          text: string;
        };
        Update: {
          id?: number;
          text?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type MenuOption = {
  items: {
    id: number;
    name: string;
    price: number;
    note: string;
  }[];
  category: string;
};
