import os
from eth_keys import keys
from eth_utils import to_checksum_address

def generate_vanity_address(suffix: str):
    while True:
        # 随机生成私钥
        private_key_bytes = os.urandom(32)
        private_key = keys.PrivateKey(private_key_bytes)

        # 从私钥生成地址
        public_key = private_key.public_key
        address = public_key.to_address()

        # 检查地址尾号是否匹配
        if address[-len(suffix):] == suffix:
            return private_key, to_checksum_address(address)

# 示例：生成以太坊地址以 "1234" 结尾
suffix = "1234"
private_key, address = generate_vanity_address(suffix)
print(f"生成的地址: {address}")
print(f"对应的私钥: {private_key}")
