<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Purchase;
use App\Models\Item;
use App\Models\Customer;

class PurchasesSeeder extends Seeder
{
    public function run()
    {
        // Retrieve all items and customers
        $items = Item::all();
        $customers = Customer::all();

        // Define the number of purchases you want to create
        $numberOfPurchases = 1000; // Adjust this number as needed

        // Prepare an array to hold the purchase data
        $purchases = [];

        // Generate the dummy data
        for ($i = 0; $i < $numberOfPurchases; $i++) {
            $randomDate = $this->generateRandomDate('2024-01-01', '2024-09-30');
            $purchases[] = [
                'item_code' => $items->random()->item_code,
                'ordered_by' => $customers->random()->email,
                'qty' => rand(1, 20),
                'status' => null, 
                'total_amount' => number_format(rand(1, 1000) / 100, 2),
                'created_at' => $randomDate,
                'updated_at' => $randomDate
            ];
        }

        Purchase::insert($purchases);
    }

    private function generateRandomDate($startDate, $endDate)
    {
        $start = strtotime($startDate);
        $end = strtotime($endDate);

        $randomTimestamp = mt_rand($start, $end);

        return date('Y-m-d H:i:s', $randomTimestamp);
    }
}
