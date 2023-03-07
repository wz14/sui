// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

/// This module implements a Bears Collection using the `sui::collectible` module.
module examples::bears {
    use sui::tx_context::{TxContext, sender};
    use sui::collectible;
    use sui::transfer;
    use sui::royalty;
    use sui::display;
    use std::option;
    use std::string::utf8;

    /// Max supply for the Collectible.
    const MAX_SUPPLY: u64 = 1000;

    /// One-time-witness to get Publisher object and prove
    /// ownership of the type.
    struct BEARS has drop {}

    /// The type of the Collectible, can contain custom metadata.
    struct Bear has store {
        // ...
    }

    /// By default, Collectible on Sui is highly customizable:
    ///  - creators can set transfer policy for Kiosks, whether to enable
    /// royalties or not (by allowing free transfers forever).
    ///
    ///  - display can be configured depending on the fields used in the Collectible
    /// for example if a name is not used, a common name can be defined.
    fun init(otw: BEARS, ctx: &mut TxContext) {
        let sender = sender(ctx);
        let (
            publisher,
            display,
            transfer_cap,
            creator_cap
        ) = collectible::create_collection<BEARS, Bear>(
            otw, option::some(MAX_SUPPLY), ctx
        );

        // Publisher object might be required for some confirmations
        // in other applications to prove ownership of type.
        transfer::transfer(publisher, sender);

        // Display is used to define the off-chain representation of the
        // object. The definitions can be updated later with new version
        // releases of the Display.
        // Check out the Display page to see suggested fields.
        display::add_multiple(&mut display, vector[
            utf8(b"name"), utf8(b"description"), utf8(b"project_url"), utf8(b"image_url")
        ], vector[
            utf8(b"Sui Bears"),
            utf8(b"Just look at this cutie!"),
            utf8(b"https://example.com/"),
            utf8(b"{image_url}")
        ]);

        // `update_version` call for the Display changes to be applied
        display::update_version(&mut display);
        transfer::transfer(display, sender);

        // Setting Royalties on trading `Bear` in `Kiosk` ecosystem

        // uncomment this line to disable royalties and allow free trades
        // royalty::set_zero_policy(transfer_cap);

        // or set a royalty fee for trading in `Kiosks`: 50 = 0.5%
        let (policy, royalty_cap) = royalty::new_royalty_policy(transfer_cap, 50, ctx);
        transfer::transfer(royalty_cap, sender);
        transfer::share_object(policy);

        // lastly send the CollectionCreatorCap to enable mints
        transfer::transfer(creator_cap, sender);
    }
}
