<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('studysubjects')->insert([
            'name' => 'Informatik - Medieninformatik',
            'university'=>'Hochschule Osnabrück',
            'faculty'=>'IuI',
            'degree'=>'B.o.Sc.',
            'semestercount'=>6
        ]);
        DB::table('users')->insert([
            'name' => 'Julia Jojo',
            'email' => Str::random(6).'@gmail.com',
            'password' => bcrypt('password'),
            'semestercount'=>2,
            'studysubject_id'=>1
        ]);
    }
}
