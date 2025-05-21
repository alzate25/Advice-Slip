// services/originalService.js
import { supabase } from "../supabaseClient";

export async function obtenerConsejosOriginales() {
  const { data, error } = await supabase
    .from("original_advices")
    .select("*")
    .order("created_at", { ascending: false }); // opcional: últimos primero

  if (error) {
    console.error("Error al obtener los consejos originales:", error.message);
    return [];
  }

  return data;
}
