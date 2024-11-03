<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            'Shirts',
            'T-Shirts',
            'Polos',
            'Outerwear',
            'Jeans',
            'Pants',
            'Shorts',
            'Underwear & Loungewear',
            'Swimwear',
            'Socks'
        ];

        $sizes = [
            'Extra Small (XS)',
            'Small (S)',
            'Medium (M)',
            'Large (L)',
            'Extra Large (XL)',
            'Double Extra Large (XXL)'
        ];

        foreach($categories as $cat) {
            foreach($sizes as $size) {
                \App\Models\Category::create([
                    'category_name' => $cat,
                    'sizes' => $size
                ]);
            }
        }
    }
}
