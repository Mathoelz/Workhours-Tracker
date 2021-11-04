@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <h1>Student suchen</h1>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-Mail</th>
                        
                        <th>Paswort</th>
                        <th>Studiengang</th>
                        <th>Fachsemester</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{$user->name}}</td>
                        <td>{{$user->email}}</td>
                        
                        <td>{{$user->password}}</td>
                        <td>{{$user->studysubject_id}}</td>
                        <td>{{$user->semestercount}}</td>
                        <td> @foreach($user->courseelements as $courseelement) {{ $courseelement->course->name }} @endforeach</td>
                    </tr>
                </tbody>
            </table>
            <a href="{{ url('user') }}" class="btn btn-info btn-block">Zurück</a>
        </div>
    </div>
</div>
    
@endsection
