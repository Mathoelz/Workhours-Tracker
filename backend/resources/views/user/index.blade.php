@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <h1>User</h1>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-Mail</th>
                        <th>Studiengang</th>
                        <th>Semester</th>
                        <th>Kurse</th>
                        <th>Bearbeiten</th>
                    </tr>
                </thead>
                <tbody>
                @foreach($users as $user)
                    <tr>
                        <td>{{$user->name}}</td>
                        <td>{{$user->email}}</td>
                        <td>{{$user->studysubject->name}}</td>
                        <td>{{$user->semestercount}}</td>
                        <td> @foreach($user->courseelements as $courseelement) {{ $courseelement->course->name }} {{$courseelement->coursetype}} - {{$courseelement->pivot->learnedHours}} Std. {{$courseelement->pivot->day}} <br/>@endforeach</td>
                        <td>
                            <div class="btn-group">
                                <a class="btn btn-secondary" href="{{ url('user/show/'.$user->id)}}"><span class="ti ti-search"></span></a>
                                <a class="btn btn-info" href="{{ url('user/edit/'.$user->id)}}"><span class="ti ti-pencil"></span></a>
                                <a class="btn btn-danger" href="{{ url('user/delete/'.$user->id)}}" onClick="return confirm('Wirklich löschen?')"><span class="ti ti-trash"></span></a>
                        
                            </div>
                        </td>
                    </tr>
                    
                @endforeach
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    
                    <td><a class="btn btn-success" href="{{ url('user/add')}}"><span class="ti ti-plus"></span></a>
                            </td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
    
@endsection
