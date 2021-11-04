<?php

namespace StudyApp\Http\Controllers;

use Illuminate\Http\Request;
use StudyApp\Models\WorkHours;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Validator;

class WorkhoursController extends Controller
{

    /**
     * 
     *  Funktion: Die Funktion fügt einen neuen Eintrag 
     *              in der Tabelle 'workhours' hinzu.
     */
    public function insertEntry(Request $request)
    {
        // request validieren 
        $request->validate([
            'userId' => 'required',
            'day' => 'required',
            'start' => 'required',
            'end' => 'required',
            'rest' => 'required'
        ]);
        // alle request-variablen passend formatieren
        $day = Carbon::parse($request->day)->format('Y-m-d');
        $start = Carbon::parse($request->start)->format('H:i');
        $end = Carbon::parse($request->end)->format('H:i');
        $rest = Carbon::parse($request->rest)->format('i');
        if ($request->driven == Null) {
            $driven = "00:00";
        } else {
            $driven = Carbon::parse($request->driven)->format('i');
        }
        // berechne die Arbeitszeit 
        $hours = $this->calculateWorkingTime($start, $rest, $end);
        // neuen Eintrag hinzufügen
        DB::table('workhours')
            ->insert(
                [
                    'user_id' => $request->userId, 'day' => $day, 'start' => $start, 'end' => $end,
                    'break' => $rest, 'driven' => $driven, 'hours' => $hours
                ]
            );
        // Rückgabe
        return response()->json([
            'message' => 'Transaction Successful'
        ], 200);
    }

    /**
     * 
     *  Funktion: Die Funktion aktualisiert einen bestimmten Eintrag 
     *              in der Tabelle 'workhours'.
     */
    public function updateEntry(Request $request)
    {
        // request validieren 
        $request->validate([
            'userId' => 'required',
            'id' => 'required',
            'day' => 'required',
            'start' => 'required',
            'end' => 'required',
            'rest' => 'required'
        ]);
        // alle request-variablen passend formatieren
        $day = Carbon::parse($request->day)->format('Y-m-d');
        $start = Carbon::parse($request->start)->format('H:i');
        $end = Carbon::parse($request->end)->format('H:i');
        $rest = Carbon::parse($request->rest)->format('i');
        if ($request->driven == Null) {
            $driven = "00:00";
        } else {
            $driven = Carbon::parse($request->driven)->format('i');
        }
        // berechne die Arbeitszeit 
        $hours = $this->calculateWorkingTime($start, $rest, $end);
        // passenden Eintrag in der DB finden und aktualisieren 
        DB::table('workhours')
            ->where([
                ['id', $request->id],
                ['user_id', '=', $request->userId]
            ])->update([
                'day' => $day, 'start' => $start, 'end' => $end,
                'break' => $rest, 'driven' => $driven, 'hours' => $hours
            ]);
        // Rückgabe
        return response()->json([
            'message' => 'Transaction Successful'
        ], 200);
    }

    /**
     * 
     *  Funktion: Die Funktion löscht einen bestimmten Eintrag 
     *              aus der Tabelle 'workhours'. 
     */
    public function deleteEntry(Request $request)
    {
        //request validieren
        $request->validate([
            'userId' => 'required',
            'dayId' => 'required'
        ]);
        // passenden Eintrag finden und löschen
        DB::table('workhours')
            ->where([
                ['id', $request->dayId],
                ['user_id', '=', $request->userId]
            ])->delete();
        // Rückgabe
        return response()->json([
            'message' => 'Entry deleted!'
        ], 200);
    }

    public function getMonth(Request $request)
    {

        $request->validate([
            'month' => 'required'
        ]);

        $month = Carbon::parse($request->month)->format('m');

        $result = DB::table('workhours')
            ->whereMonth('day', $month)
            ->get();

        return $result;
    }


    public function getMonth2(Request $request)
    {
        $request->validate([
            'month' => 'required'
        ]);

        $month = Carbon::parse($request->month)->format('d');

        $result = DB::table('workhours')
            ->whereDay('day', $month)
            ->get();

        return $result;
    }

    /**
     * 
     *  Funktion: Die Funktion erstellt einen Eintrag in der Tabelle 'workhours'
     *               alle Werte außer 'user_id' werden erstmal auf 00:00 oder 0 gesetzt
     */
    public function insertEmptyEntry(Request $request)
    {
        // request validieren
        $request->validate([
            'user_id' => 'required',
        ]);
        // // neuen Eintrag hinzufügen
        DB::table('workhours')
            ->insert(
                ['user_id' => $request->user_id,]
            );
        // Rückgabe
        return response()->json([
            'message' => 'Transaction Successful'
        ], 200);
    }

    /**
     * 
     *  Funktion: Die Funktion aktualisiert die Zeile 'start' in der Tabelle 'workhours'
     * 
     **/
    public function updateStartTime(Request $request)
    {
        // request validieren
        $request->validate([
            'id' => 'required',
            'user_id' => 'required',
            'start' => 'required',
        ]);
        // startZeit formatieren 
        $start = Carbon::parse($request->start)->format('H:i');
         // passenden Eintrag finden und aktualisieren 
         $this->updateRowInWorkhours($request->id, $request->user_id, 'start', $start);
         // variablen aus der DB lesen
         $break = $this->fromWorkhours($request->id, $request->user_id, 'break');
         $end   = $this->fromWorkhours($request->id, $request->user_id, 'end');
         // falls 'start' und 'ende' definiert sind
         if ($end != "00:00") {
             // stunden ohne pause berechnen
             $hours = $this->calculateWorkingTime($start, $break, $end);
             // 'hours' in der DB aktualisieren
             $this->updateRowInWorkhours($request->id, $request->user_id, 'hours', $hours);
         }
        // Rückgabe
        return response()->json([
            'message' => 'Transaction Successful'
        ], 200);
    }

    /**
     * 
     *  Funktion: Die Funktion aktualisiert die Zeile 'break' in der Tabelle 'workhours'
     * 
     **/
    public function updateBreakTime(Request $request)
    {
        // request validieren 
        $request->validate([
            'id' => 'required',
            'user_id' => 'required',
            'breakTime' => 'required',
        ]);
        // pausenZeit formatieren
        $break = Carbon::parse($request->breakTime)->format('i');
        // passenden Eintrag finden und aktualisieren 
        $this->updateRowInWorkhours($request->id, $request->user_id, 'break', $break);
        // stunden diferenz berechnen 
        $start = $this->fromWorkhours($request->id, $request->user_id, 'start');
        $end   = $this->fromWorkhours($request->id, $request->user_id, 'end');
        // falls 'start' und 'ende' definiert sind
        if ($start != "00:00" && $end != "00:00") {
            // stunden ohne pause berechnen
            $hours = $this->calculateWorkingTime($start, $break, $end);
            // 'hours' in der DB aktualisieren
            $this->updateRowInWorkhours($request->id, $request->user_id, 'hours', $hours);
        }
        // Rückgabe
        return response()->json([
            'message' => 'Transaction Successful'
        ], 200);
    }

    /**
     * 
     *  Funktion: Die Funktion aktualisiert die Zeile 'end' in der Tabelle 'workhours'
     * 
     **/
    public function updateEndTime(Request $request)
    {
        // request validieren 
        $request->validate([
            'id' => 'required',
            'user_id' => 'required',
            'end' => 'required',
        ]);
        // 'end' passend formatieren 
        $end = Carbon::parse($request->end)->format('H:i');
        // passenden Eintrag finden und aktualisieren 
        $this->updateRowInWorkhours($request->id, $request->user_id, 'end', $end);
        // 'die Variablen aus der DB rauslesen
        $start = $this->fromWorkhours($request->id, $request->user_id, 'start');
        $break   = $this->fromWorkhours($request->id, $request->user_id, 'break');
        // falls 'start' und 'break' definiert sind
        if ($start != "00:00") {
            // stunden ohne pause berechnen
            $hours = $this->calculateWorkingTime($start, $break, $end);
            // 'hours' in der DB aktualisieren
            $this->updateRowInWorkhours($request->id, $request->user_id, 'hours', $hours);
        }
        // Rückgabe
        return response()->json([
            'message' => 'Transaction Successful'
        ], 200);
    }

    /**
     * 
     *  Funktion: Die Funktion aktualisiert die Zeile 'driven' in der Tabelle 'workhours'
     * 
     **/
    public function updateDrivenTime(Request $request)
    {
        //request validieren
        $request->validate([
            'id' => 'required',
            'user_id' => 'required',
            'driven' => 'required',
        ]);
        // falls die Fahrzeit nicht null ist, dann passend formatieren
        if ($request->driven == Null) {
            $driven = "00:00";
        } else {
            $driven = Carbon::parse($request->driven)->format('i');
        }
        // Passenden Eintrag finden und aktualisieren
        $this->updateRowInWorkhours($request->id, $request->user_id, 'driven', $driven);
        // Rückgabe
        return response()->json([
            'message' => 'Transaction Successful lo'
        ], 200);
    }

    /* ---- Hilfsfunktionen Block ---- */

    public function calculateWorkingTime($start, $break, $end)
    {
        // berechne die Differenz zwischen Start und Ende
        $diffInMinutes = Carbon::parse($start)->diffInMinutes(Carbon::parse($end));
        // pausen abziehen und in Stunden umrechnen
        $diffInMinutesWithoutBreak = ($diffInMinutes - $break) / 60;
        // gebe die Arbeitsstunden ohne mit Pausenzeiten formatiert in Form eines Floats zurück
        return number_format((float) $diffInMinutesWithoutBreak, 2, '.', '');
    }

    public function fromWorkhours($id, $user_id, $value)
    {
        $returnValue = DB::table('workhours')->where([
            ['id', $id],
            ['user_id', '=', $user_id]
        ])->value($value);
        return $returnValue;
    }

    public function updateRowInWorkhours($id, $user_id, $rowName, $value)
    {
        DB::table('workhours')
            ->where([
                ['id', $id],
                ['user_id', '=', $user_id]
            ])->update([
                $rowName => $value
            ]);
    }
}
