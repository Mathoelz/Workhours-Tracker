<?php

namespace StudyApp;

use Illuminate\Database\Eloquent\Model;

class WorkHours extends Model
{
    public static $rules = array(
        'day'=>'required',
        'start'=>'required',
        'end'=>'required',
        'break'=>'required',
        'hours'=>'required',
        'user_id'=>'required'
    );

    public function user(){
        return $this->belongsTo(User::class);
    }
}
