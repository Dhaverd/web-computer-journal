<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;
    protected $fillable = ['computer_id', 'description', 'status'];

    public function computer(){
        return  $this->belongsTo(Computer::class);
    }
}
