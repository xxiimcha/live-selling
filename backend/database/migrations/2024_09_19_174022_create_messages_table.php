<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->integer('current_user');
            $table->integer('sender_id');
            $table->integer('recipient_id');
            $table->text('content')->nullable();
            $table->text("image_name")->nullable();
            // $table->boolean('read_receipt');
            $table->timestamps();
            $table->softDeletes();
        });

        DB::statement("ALTER TABLE messages ADD attachments LONGBLOB NULL AFTER image_name");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
