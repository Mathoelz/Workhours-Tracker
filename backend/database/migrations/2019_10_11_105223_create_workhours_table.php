<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWorkhoursTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('workhours', function (Blueprint $table) {
            $table->increments('id');
            //$table->bigIncrements('id');
            $table->timestamps();
            $table->timestamp('day')->useCurrent=true;
            $table->string('start',10)->default("00:00");
            $table->string('driven',10)->default("00");;
            $table->string('break',10)->default("00");;
            $table->string('end',10)->default("00:00");;
            $table->double('hours')->default(0.);
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('workhours');
    }
}
