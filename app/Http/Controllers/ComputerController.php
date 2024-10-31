<?php

namespace App\Http\Controllers;

use App\Models\Computer;
use Illuminate\Http\Request;

class ComputerController extends Controller
{
    public function index()
    {
        return Computer::select()->get();
    }

    public function getById(Request $request){
        return Computer::find($request->get('id'));
    }

    public function getByUserId(Request $request){
        return Computer::select()->where('user_id', '=', $request->get('user_id'))->get();
    }

    public function create(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:256',
            'cpu' => 'nullable|string|max:256',
            'motherboard' => 'nullable|string|max:256',
            'gpu' => 'nullable|string|max:256',
            'additional_info' => 'nullable|string|max:256',
        ]);

        $computer = Computer::create($request->all());
        return response()->json($wish, 201);
    }

    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:computers,id',
            'name' => 'required|string|max:256',
            'cpu' => 'nullable|string|max:256',
            'motherboard' => 'nullable|string|max:256',
            'gpu' => 'nullable|string|max:256',
            'additional_info' => 'nullable|string|max:256',
        ]);

        $computer = Computer::find($request->get('id'));
        $computer->name = $request->get('name');
        $computer->cpu = $request->get('cpu');
        $computer->motherboard = $request->get('motherboard');
        $computer->gpu = $request->get('gpu');
        $computer->additional_info = $request->get('additional_info');
        $computer->save();
        return response()->json($computer);

    }

    public function destroy(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:wishes,id',
        ]);
        $destroyed = Computer::destroy($request->get('id'));
        return response()->json($destroyed, 204);

    }
}
