import unittest
from calculator import multiply

class TestCalculator(unittest.TestCase):

    def test_multiply(self):
        self.assertEqual(multiply(2, 3), 6)
        self.assertEqual(multiply(-1, 1), -1)
        self.assertEqual(multiply(-1, -1), 1)
        self.assertEqual(multiply(0, 1), 0)

if __name__ == "__main__":
    unittest.main()

