<?php

namespace StudyApp\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use StudyApp\Http\Controllers\WorkhoursController;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public static $rules = array(
        'name'=>'required|min:2',
        'e-mail'=>'required|email|min:5',
        'password'=>'required|min:8',
        'semestercount'=>'required|int|min:1',
        'studysubject_id'=>'required'
    );



    public function courseelements()
    {
        return $this->belongsToMany(Courseelement::class)->withPivot('learnedTime','day');
    }

    public function studysubject()
    {
        return $this->belongsTo(Studysubject::class);
    }

    public function workhours(){
        return $this->hasMany(Workhours::class);
    }

}
