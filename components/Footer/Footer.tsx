import React from 'react';
import { Box, Container, SimpleGrid, Text, Stack, Link } from '@chakra-ui/react';
import Image from 'next/image';
import type { SimpleGridProps } from '@chakra-ui/react'; // Import SimpleGridProps type

const Footer = () => {
  const gridColumns: SimpleGridProps['columns'] = { base: 1, md: 4 }; // Explicitly define the type

  return (
    <Box as="footer" bg="black" color="white" py={16} position="relative" zIndex={10}>
      <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
        {/* Use the explicitly typed variable for columns */}
        <SimpleGrid columns={gridColumns} >
          <Stack gridColumn={{ base: 'auto', md: 'span 2' }}>
            <Stack direction="row" align="center">
              <Image width={40} height={40} src={'/sentinel-logo-blue.png'} alt={'sentinel-logo'} />
              <div className="hero-title ml-2 text-lg sm:text-xl bg-gradient-to-r from-blue-400 to-[#55f7ed] bg-clip-text text-transparent no-underline">
                SENTINEL IA
              </div>
            </Stack>
            <Text color="gray.300" maxW="md">
              Pioneering the first Tech MarketCap for Web3 projects. Measure and demonstrate your technological quality beyond trading volumes.
            </Text>
            <Text fontSize="sm" color="gray.400">
              © 2024 Sentinel IA. Todos los derechos reservados.
            </Text>
          </Stack>

          <Stack>
            <Text fontWeight="semibold" mb={4}>Navegación</Text>
            <Stack >
              <Link href="#" _hover={{ color: 'white', transition: 'colors' }}>Inicio</Link>
              <Link href="#ranking" _hover={{ color: 'white', transition: 'colors' }}>Ranking</Link>
              <Link href="#como-funciona" _hover={{ color: 'white', transition: 'colors' }}>Cómo funciona</Link>
              <Link href="#beneficios" _hover={{ color: 'white', transition: 'colors' }}>Beneficios</Link>
              <Link href="#faqs" _hover={{ color: 'white', transition: 'colors' }}>FAQs</Link>
            </Stack>
          </Stack>

          <Stack>
            <Text fontWeight="semibold" mb={4}>Servicios</Text>
            <Stack >
              <Link href="#" _hover={{ color: 'white', transition: 'colors' }}>Auditoría inicial</Link>
              <Link href="#" _hover={{ color: 'white', transition: 'colors' }}>Monitoreo continuo</Link>
              <Link href="#" _hover={{ color: 'white', transition: 'colors' }}>Widget integración</Link>
              <Link href="#contacto" _hover={{ color: 'white', transition: 'colors' }}>Contacto</Link>
              <Link href="#" _hover={{ color: 'white', transition: 'colors' }}>Soporte</Link>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;