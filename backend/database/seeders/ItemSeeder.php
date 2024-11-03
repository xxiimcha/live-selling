<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    public function run()
    {
        //rand(1, 100)

        $items = [
            'Shirts' => [
                'Casual Button-Up Shirt',
                'Dress Shirt',
                'Flannel Shirt',
                'Oxford Shirt',
                'Short Sleeve Shirt',
                'Linen Shirt',
                'Graphic Shirt',
                'Hawaiian Shirt',
                'Chambray Shirt',
                'Work Shirt',
            ],
            'T-Shirts' => [
                'Basic Crew Neck T-Shirt',
                'V-Neck T-Shirt',
                'Graphic T-Shirt',
                'Long Sleeve T-Shirt',
                'Tie-Dye T-Shirt',
                'Pocket T-Shirt',
                'Athletic T-Shirt',
                'Crop Top T-Shirt',
                'Striped T-Shirt',
                'Vintage Logo T-Shirt',
            ],
            'Polos' => [
                'Classic Polo Shirt',
                'Performance Polo',
                'Slim Fit Polo',
                'Long Sleeve Polo',
                'Printed Polo',
                'Pique Polo',
                'Ribbed Collar Polo',
                'Contrast Trim Polo',
                'Golf Polo',
                'Casual Knit Polo',
            ],
            'Outerwear' => [
                'Denim Jacket',
                'Leather Jacket',
                'Bomber Jacket',
                'Trench Coat',
                'Windbreaker',
                'Parka',
                'Utility Jacket',
                'Peacoat',
                'Fleece Jacket',
                'Anorak',
            ],
            'Jeans' => [
                'Skinny Jeans',
                'Bootcut Jeans',
                'Straight-Leg Jeans',
                'Flared Jeans',
                'Distressed Jeans',
                'High-Waisted Jeans',
                'Boyfriend Jeans',
                'Mom Jeans',
                'Cropped Jeans',
                'Jeggings',
            ],
            'Pants' => [
                'Chinos',
                'Dress Pants',
                'Cargo Pants',
                'Joggers',
                'Palazzo Pants',
                'Capris',
                'Wide-Leg Pants',
                'Tapered Pants',
                'Linen Pants',
                'Track Pants',
            ],
            'Shorts' => [
                'Denim Shorts',
                'Chino Shorts',
                'Athletic Shorts',
                'Cargo Shorts',
                'Board Shorts',
                'Bermuda Shorts',
                'Running Shorts',
                'Swim Trunks',
                'Lounge Shorts',
                'Cycling Shorts',
            ],
            'Underwear & Loungewear' => [
                'Boxer Briefs',
                'Briefs',
                'Bikini Underwear',
                'Sleep Shorts',
                'Pajama Set',
                'Robe',
                'Lounge Pants',
                'Thermal Underwear',
                'Sports Bra',
                'Lounge Top',
            ],
            'Swimwear' => [
                'One-Piece Swimsuit',
                'Bikini Set',
                'Board Shorts',
                'Rash Guard',
                'Swim Trunks',
                'Swim Dress',
                'High-Waisted Bikini',
                'Swim Briefs',
                'Cover-Up',
                'Tankini',
            ],
            'Socks' => [
                'Ankle Socks',
                'Crew Socks',
                'Dress Socks',
                'No-Show Socks',
                'Compression Socks',
                'Wool Socks',
                'Athletic Socks',
                'Novelty Socks',
                'Boot Socks',
                'Knee-High Socks',
            ],
        ];

        $sizes = [
            'Extra Small (XS)',
            'Small (S)',
            'Medium (M)',
            'Large (L)',
            'Extra Large (XL)',
            'Double Extra Large (XXL)'
        ];

        foreach ($items as $category => $products) {
            echo "Category: $category\n";
            foreach ($products as $product) {
                foreach($sizes as $size) {
                    echo "- $product\n";
                    \App\Models\Item::create([
                        'item_name' => $product,
                        'item_description' => $product,
                        'category' => $category,
                        'sizes' => $size,
                        'qty' => rand(1, 100),
                        'price' => rand(1, 500)
                    ]);
                }
            }
        }
    }
}
