<?php

namespace StudyApp\Http\Controllers\Auth;

use StudyApp\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use StudyApp\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            //'remember_me' => 'boolean'
        ]);
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string'
        ]);

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);

        $user->save();

        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name'              => 'required|string',
            'monthTarget'       => 'required',
            'hourlyWage'        => 'required',
            //'fakultaet'         => 'required|string',

            //'abschluss'         => 'required|string',
            //'hochschulsemester' => 'required',
        ]);

        $user = Auth::user();

        $user->name         = $request->name;
        $user->monthTarget  = $request->monthTarget;
        $user->hourlyWage   = $request->hourlyWage;
        //$user->studysubject->faculty = $request->fakultaet;
        //$user->studysubject->name = $request->studiengang;
        //$user->studysubject->degree = $request->abschluss;

        //$user->studysubject->save();
        $user->save();

        return response()->json([
            'message' => 'Successfully updated user!'
        ], 201);
    }

    public function delete(Request $request)
    {
        $request->user()->delete();
        return response()->json([
            'message' => 'Your account successfully deleted'
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function test()
    {
        $user = Auth::user();

        return response()->json([
            'name' => $user->name,
            'semestercount' => $user->semestercount,
            'studysubject'  => $user->studysubject->name,
            'degree'        => 'asad#' . $user->studysubject->degree,
            'faculty'       => $user->studysubject->faculty,
            'university'    => $user->studysubject->university,
        ]);
    }
}
