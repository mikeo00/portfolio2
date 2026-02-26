const supabase = require("../config/db.cjs");

function safeName(name = "file") {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-");
}

class Buckets {
  static async uploadProjectImage(file) {
    const path = `projects/${Date.now()}-${safeName(file.originalname)}`;
    const { data, error } = await supabase.storage
      .from("images")
      .upload(path, file.buffer, { contentType: file.mimetype, upsert: true });

    if (error) throw error;
    return data; // { path, ... }
  }

static async uploadLogoLang(file) {
  const filePath = `languages/${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;

  const { data, error } = await supabase.storage
    .from("language_logos")
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) throw error;
  return data; 
}

 
  static async uploadFrameworkLogo(file) {
    const path = `frameworks/${Date.now()}-${safeName(file.originalname)}`;
    const { data, error } = await supabase.storage
      .from("framework_logos")
      .upload(path, file.buffer, { contentType: file.mimetype, upsert: true });

    if (error) throw error;
    return data;
  }

  static getPublicUrl(bucket, path) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  // If bucket is PRIVATE (or you prefer secure links):
  static async createSignedUrl(bucket, path, expiresInSeconds = 60 * 60) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresInSeconds);

    if (error) throw error;
    return data.signedUrl;
  }

  // List files inside a folder
  static async list(bucket, folder = "", limit = 100, offset = 0) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, { limit, offset, sortBy: { column: "created_at", order: "desc" } });

    if (error) throw error;
    return data; // array of objects
  }

  // Download file bytes (rare for portfolio, but useful)
  static async download(bucket, path) {
    const { data, error } = await supabase.storage.from(bucket).download(path);
    if (error) throw error;
    return data; // Blob-like / Response depending on runtime
  }

  // Remove file
  static async remove(bucket, pathsArray) {
    const { data, error } = await supabase.storage.from(bucket).remove(pathsArray);
    if (error) throw error;
    return data;
  }
}

module.exports = Buckets;
