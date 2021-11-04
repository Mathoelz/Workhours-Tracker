<?php

namespace StudyApp\Http\Controllers;

use StudyApp\Models\User;
use StudyApp\Models\Courseelement;
use StudyApp\Models\Studysubject;
use Request;
use Validator;

class UserController extends Controller
{
    public function getIndex()
    {
        $users = User::orderBy('name')->paginate(20);

        return view('user/index')->with('users', $users);
    }

    public function getAdd()
    {
        $studysubjects = Studysubject::pluck('name','id');
        $courseelements = Courseelement::orderBy('id')->get();
        
        return view('user/add', compact('studysubjects', 'courseelements'));
    }
    

    public function postAdd()
    {
        $validator = Validator::make(Request::all(), User::$rules);

        if ($validator->passes()) {
            $user = new User();
            $user->name = Request::input('name', '');
            $user->password = Request::input('password', '');
            $user->email = Request::input('email', '');
            $user->studysubject_id = Request::input('studysubject_id', '');
            $user->monthTarget = Request::input('monthTarget', '');
            $user->hourlyWage = Request::input('hourlyWage', '');
            $user->save();

            $user->courseelements()->detach();

            $courseelements  = Request::input('courseelements', array());
            foreach($courseelements as $courseelement)
            {
                $user->courseelements()->attach($courseelement);
            }


            return redirect('user');
        } else {
            return redirect('user/add', compact('studysubjects'))->withErrors($validator)->withInput();
        }
    }

    public function getEdit($id = null)
    {
        $studysubjects= Studysubject:: pluck('name','id');
        $courseelements = Courseelement::orderBy('id')->get();
        $user = User::find($id);
        if ($user) {
            return view('user/edit', compact('studysubjects','courseelements'))->with('user', $user);
        }
        return redirect('user');
    }

    public function postEdit($id = null)
    {
        $user = User::find($id);
        if ($user) {
            $validator = Validator::make(Request::all(), User::$rules);

            if ($validator->passes()) {
                $user->name = Request::input('name', '');
                $user->password = Request::input('password', '');
                $user->email = Request::input('email', '');
                $user->studysubject_id = Request::input('studysubject_id', '');
                $user->monthTarget = Request::input('monthTarget', '');
                $user->hourlyWage = Request::input('hourlyWage', '');
                $user->save();

                $user->courseelements()->detach();

                $courseelements  = Request::input('courseelements', array());
                foreach($courseelements as $courseelement)
                {
                    $user->courseelements()->attach($courseelement);
                }

                return redirect('user');
            } else {
                return redirect('user/edit/' . $user->id)->withErrors($validator)->withInput();
            }
        } else {
            return redirect('user');
        }
    }

    public function getShow($id = null)
    {
        $user = User::find($id);
        if ($user) {
            return view('user/show')->with('user', $user);
        }
        return redirect('user');
    }


    public function getDelete($id = null)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
        }
        return redirect('user');
    }

    //API

    public function index(){
        return User::all();
    }

    public function show($id){
        return User::find($id);
    }
    
}
