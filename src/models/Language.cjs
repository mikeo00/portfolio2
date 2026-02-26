const supabase = require('../config/db.cjs');

class Language{
    static async find(){
        const {data,error} = await supabase.from('languages').select('*');
        if(error){
            throw error;
        }else{
            return data;
        }
    }
    static async findbyid(id){
        const {data,error} = await supabase.from('languages').select('*').eq('id',id).single();
        if(error){
            throw error;
        }else{
            return data;
        }
    }
    static async create(language){
        const {data,error} =await supabase.from('languages').insert(language).select().single();
        if(error){
            throw error;
        }else{
            return data;
        }
    }
    static async findByIdUpdate(id, language) {
  const { data, error } = await supabase
    .from("languages")
    .update(language)
    .eq("id", id)
    .select().single();

  if (error) throw error;
  return data;
}

    static async delete(id) {
        const {data,error} =await supabase.from('languages').delete().eq('id',id).select().single();
        if(error){
            throw error;
        }else{
            return data;
        }
    }
}
module.exports=Language;