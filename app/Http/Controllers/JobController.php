<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index()
    {
        return Job::select()->get();
    }

    public function getByComputerId(Request $request){
        return Job::select()->where('computer_id', '=', $request->get('computer_id'))->get();
    }

    public function create(Request $request)
    {
        $request->validate([
            'computer_id' => 'required|exists:computers,id',
            'description' => 'required|string|max:256',
            'status' => 'nullable|boolean'
        ]);

        $job = Job::create($request->all());
        return response()->json($job, 201);
    }

    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:jobs,id',
            'computer_id' => 'required|exists:computers,id',
            'description' => 'required|string|max:256',
            'status' => 'nullable|boolean'
        ]);

        $job = Job::find($request->get('id'));
        $job->computer_id = $request->get('computer_id');
        $job->description = $request->get('description');
        $job->status = $request->get('status');
        $job->save();
        return response()->json($job);
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:jobs,id',
        ]);
        $destroyed = Job::destroy($request->get('id'));
        return response()->json($destroyed, 204);
    }
}
