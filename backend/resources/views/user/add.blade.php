@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <h1>User hinzufügen</h1>
            
            {!! Form::open(['url' => 'user/add']) !!}
                @csrf
                <div class="form-group">
                    {{ Form::label('name', __('Name')) }}
                    {{ Form::text('name', null, ['class'=>'form-control'])}}
                    @if ($errors->has('name'))
                        <span class="help-block">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group">
                    {{ Form::label('email', __('E-Mail')) }}
                    {{ Form::text('email', null, ['class'=>'form-control'])}}
                    @if ($errors->has('email'))
                        <span class="help-block">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                    @endif
                </div>
                
                <div class="form-group">
                    {{ Form::label('password', __('Passwort')) }}
                    {{ Form::text('password', null, ['class'=>'form-control'])}}
                    @if ($errors->has('password'))
                        <span class="help-block">
                            <strong>{{ $errors->first('password') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group">
                    {{ Form::label('studysubject_id', __('Studysubject ID')) }}
                    {!! Form::select('studysubject_id', $studysubjects, null, ['class' => 'form-control']) !!}
                </div>
                <div class="form-group">
                    {{ Form::label('semestercount', __('Fachsemester')) }}
                    {{ Form::text('semestercount', null, ['class'=>'form-control'])}}
                    @if ($errors->has('semestercount'))
                        <span class="help-block">
                            <strong>{{ $errors->first('semestercount') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group">
                    {{ Form::label('courseelements[]', __('Courseelements')) }} <br/>
                    @foreach($courseelements as $courseelement)
                        {{Form::checkbox('courseelements[]', $courseelement->id)}} {{$courseelement->course->name}} - {{$courseelement->coursetype}} - Workload: {{$courseelement->workload}} Std. <br/>
                    @endforeach

                    @if($errors->has('courseelements[]'))
                        <span class="help-block">
                            <strong>{{ $errors->first('courseelements[]') }}</strong>
                        </span>
                    @endif
                </div>
                
                
                

                <div class="form-group">
                    <input type="submit" value="Speichern" class="btn btn-success btn-block" />
                    <a href="{{ url('user') }}" class="btn btn-info btn-block">Zurück</a>
                </div>
            {!! Form::close() !!}
            
        </div>
    </div>
</div>
@endsection
