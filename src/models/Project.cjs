const supabase = require("../config/db.cjs");

class Project{
    static async find(){
        const {data,error} = await supabase.from("projects").select('*');
        if(error){
            throw error;
        }else{
            return data;
        }
    }
    static async findbyid(id){
        const {data,error} = await supabase.from("projects").select('*').eq('id',id).single();
        if(error){
            throw error;
        }else{
            return data;
        }
    }
    static async create(project){
        const {data,error} = await supabase.from("projects").insert(project).select().single();
        if(error){
            throw error;
        }else{
            return data;
        }
    }
    static async updatebyid(id,project){
        const {data,error} = await supabase.from("projects").update(project).eq('id',id).select().single();
        if(error){
            throw error;
        }else return data;
    }
    static async delete(id){
        const {data,error} = (await supabase.from("projects").delete().eq('id',id)).select().single();
        if (error) throw error;
        else return data;
    }
}
module.exports = Project;