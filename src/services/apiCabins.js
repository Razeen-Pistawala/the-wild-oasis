import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  let imageName;
  let imagePath = newCabin.image;

  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(supabaseUrl);

  if (!hasImagePath && newCabin.image instanceof File) {
    const sanitizedFilename = newCabin.image.name
      .replaceAll(" ", "_")
      .replaceAll(":", "-")
      .replace(/[^\w.-]/g, "");

    imageName = `${Math.random()
      .toString(36)
      .substring(2, 10)}-${sanitizedFilename}`;
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }
  let query = supabase.from("cabins");
  // 1.Create Cabin
  // A. create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B. Edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  // 2. If no Error Upload Image.

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image was not uploaded and the cabin could not be created"
    );
  }
  return data;

  // 3. Delete cabin if there was an error uploading the image.
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
