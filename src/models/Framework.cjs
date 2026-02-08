const supabase = require('../config/db.cjs');
const { default: Language } = require('./Language.cjs');

class Framework{
    static async find(){
        const {data,error} = await supabase.from('frameworks').select('*');
        if(error){
            throw error;
        }else{
            return data;
        }
    }
    static async findbyid(id){
        const {data,error} = await supabase.from('frameworks').select('*').eq('id',id).single();
        if(error){
            throw error;
        }else{
            return data;
        }
    }
    static async create(framework){
        const {data,error} = await supabase.from('frameworks').insert(framework).select().single();
        if(error){
            throw error;
        }else{
            return data;
        }
    }
    static async updatebyid(id,framework){
        const{data,error} = await supabase.from('frameworks').update(framework).eq('id',id).select().single();
        if(error){
            throw error;
        }else{
            return data;
        }
    }
    static async delete(id){
        const {data,error} = await supabase.from('frameworks').delete().eq('id',id).select().single();
        if(error){
            throw error;
        }else{
            return data;
        }
    }
}
module.exports=Framework;
