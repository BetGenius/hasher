// Copyright (c) 2021-2022 The Raven Core developers
// Copyright (c) 2024 The BetGenius Core developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#pragma once

#include <include/keccak.h>
#include <include/hash_types.hpp>

namespace ethash
{
inline hash256 keccak256(const uint8_t* data, size_t size) noexcept
{
    return ethash_keccak256(data, size);
}

inline hash256 keccak256(const hash256& input) noexcept
{
    return ethash_keccak256_32(input.bytes);
}

inline hash512 keccak512(const uint8_t* data, size_t size) noexcept
{
    return ethash_keccak512(data, size);
}

inline hash512 keccak512(const hash512& input) noexcept
{
    return ethash_keccak512_64(input.bytes);
}

static constexpr auto keccak256_32 = ethash_keccak256_32;
static constexpr auto keccak512_64 = ethash_keccak512_64;

}  // namespace ethash
